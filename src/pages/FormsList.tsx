import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Edit, Trash2, Eye, Copy } from 'lucide-react';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Form {
  id: string;
  title: string;
  description: string;
  is_published: boolean;
  created_at: string;
}

const FormsList = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteFormId, setDeleteFormId] = useState<string | null>(null);
  const { isAdminAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
      return;
    }
    loadForms();
  }, [isAdminAuthenticated]);

  const loadForms = async () => {
    try {
      const { data, error } = await supabase
        .from('forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setForms(data || []);
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

  const deleteForm = async () => {
    if (!deleteFormId) return;

    try {
      const { error } = await supabase
        .from('forms')
        .delete()
        .eq('id', deleteFormId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Form deleted successfully",
      });

      loadForms();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeleteFormId(null);
    }
  };

  const copyFormLink = (formId: string) => {
    const link = `${window.location.origin}/forms/${formId}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Success",
      description: "Form link copied to clipboard",
    });
  };

  if (!isAdminAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate('/admin')} variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Forms</h1>
          </div>
          <Button onClick={() => navigate('/admin/forms/create')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Form
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>All Forms</CardTitle>
            <CardDescription>Manage your custom forms</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : forms.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No forms yet. Create your first form!</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {forms.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{form.title}</p>
                          {form.description && (
                            <p className="text-sm text-muted-foreground">{form.description}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={form.is_published ? "default" : "secondary"}>
                          {form.is_published ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(form.created_at), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {form.is_published && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyFormLink(form.id)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/admin/forms/${form.id}/submissions`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/admin/forms/${form.id}/edit`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteFormId(form.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={!!deleteFormId} onOpenChange={() => setDeleteFormId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the form and all its submissions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteForm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FormsList;
