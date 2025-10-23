import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Trash2, GripVertical, Save, Eye } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

type FieldType = 'text' | 'email' | 'number' | 'textarea' | 'radio' | 'checkbox' | 'select' | 'date' | 'time' | 'file';

interface FormField {
  id: string;
  field_type: FieldType;
  label: string;
  placeholder: string;
  required: boolean;
  options: string[];
  order_index: number;
}

const FormBuilder = () => {
  const { formId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [fields, setFields] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAdminAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
      return;
    }
    if (formId) {
      loadForm();
    }
  }, [isAdminAuthenticated, formId]);

  const loadForm = async () => {
    try {
      const { data: form, error: formError } = await supabase
        .from('forms')
        .select('*')
        .eq('id', formId)
        .single();

      if (formError) throw formError;

      const { data: formFields, error: fieldsError } = await supabase
        .from('form_fields')
        .select('*')
        .eq('form_id', formId)
        .order('order_index');

      if (fieldsError) throw fieldsError;

      setTitle(form.title);
      setDescription(form.description || '');
      setIsPublished(form.is_published);
      setFields(formFields.map(f => ({
        id: f.id,
        field_type: f.field_type as FieldType,
        label: f.label,
        placeholder: f.placeholder || '',
        required: f.required,
        options: Array.isArray(f.options) ? (f.options as string[]) : [],
        order_index: f.order_index
      })));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const addField = () => {
    const newField: FormField = {
      id: `temp-${Date.now()}`,
      field_type: 'text',
      label: 'New Field',
      placeholder: '',
      required: false,
      options: [],
      order_index: fields.length
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const deleteField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedFields = items.map((field, index) => ({
      ...field,
      order_index: index
    }));

    setFields(reorderedFields);
  };

  const saveForm = async () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a form title",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      let savedFormId = formId;

      if (formId) {
        // Update existing form
        const { error: updateError } = await supabase
          .from('forms')
          .update({ title, description, is_published: isPublished })
          .eq('id', formId);

        if (updateError) throw updateError;

        // Delete existing fields
        const { error: deleteError } = await supabase
          .from('form_fields')
          .delete()
          .eq('form_id', formId);

        if (deleteError) throw deleteError;
      } else {
        // Create new form
        const { data: newForm, error: createError } = await supabase
          .from('forms')
          .insert({ title, description, is_published: isPublished })
          .select()
          .single();

        if (createError) throw createError;
        savedFormId = newForm.id;
      }

      // Insert fields
      const fieldsToInsert = fields.map(f => ({
        form_id: savedFormId,
        field_type: f.field_type as any,
        label: f.label,
        placeholder: f.placeholder,
        required: f.required,
        options: f.options.length > 0 ? (f.options as any) : null,
        order_index: f.order_index
      }));

      if (fieldsToInsert.length > 0) {
        const { error: fieldsError } = await supabase
          .from('form_fields')
          .insert(fieldsToInsert);

        if (fieldsError) throw fieldsError;
      }

      toast({
        title: "Success",
        description: "Form saved successfully",
      });

      navigate('/admin/forms');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAdminAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate('/admin/forms')} variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">{formId ? 'Edit Form' : 'Create Form'}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="publish">{isPublished ? 'Published' : 'Publish'}</Label>
              <Switch
                id="publish"
                checked={isPublished}
                onCheckedChange={setIsPublished}
              />
            </div>
            <Button onClick={saveForm} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : 'Save Form'}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Form Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Form Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter form title"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter form description"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Form Fields</h2>
          <Button onClick={addField} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Field
          </Button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="fields">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {fields.map((field, index) => (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="p-4"
                      >
                        <div className="flex gap-4">
                          <div {...provided.dragHandleProps} className="flex items-center">
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Field Type</Label>
                                <Select
                                  value={field.field_type}
                                  onValueChange={(value) => updateField(field.id, { field_type: value as FieldType })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="number">Number</SelectItem>
                                    <SelectItem value="textarea">Textarea</SelectItem>
                                    <SelectItem value="radio">Radio</SelectItem>
                                    <SelectItem value="checkbox">Checkbox</SelectItem>
                                    <SelectItem value="select">Select</SelectItem>
                                    <SelectItem value="date">Date</SelectItem>
                                    <SelectItem value="time">Time</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={field.required}
                                  onCheckedChange={(checked) => updateField(field.id, { required: checked })}
                                />
                                <Label>Required</Label>
                              </div>
                            </div>
                            <div>
                              <Label>Label</Label>
                              <Input
                                value={field.label}
                                onChange={(e) => updateField(field.id, { label: e.target.value })}
                                placeholder="Field label"
                              />
                            </div>
                            <div>
                              <Label>Placeholder</Label>
                              <Input
                                value={field.placeholder}
                                onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                                placeholder="Field placeholder"
                              />
                            </div>
                            {['radio', 'checkbox', 'select'].includes(field.field_type) && (
                              <div>
                                <Label>Options (one per line)</Label>
                                <Textarea
                                  value={field.options.join('\n')}
                                  onChange={(e) => updateField(field.id, { options: e.target.value.split('\n').filter(o => o.trim()) })}
                                  placeholder="Option 1&#10;Option 2&#10;Option 3"
                                  rows={3}
                                />
                              </div>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteField(field.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {fields.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">
            <p>No fields yet. Click "Add Field" to create your first field.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
