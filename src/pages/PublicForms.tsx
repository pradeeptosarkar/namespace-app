import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FileText } from 'lucide-react';

interface Form {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
}

const PublicForms = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      const { data, error } = await supabase
        .from('forms')
        .select('*')
        .eq('is_published', true)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading forms...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Available Forms</h1>
          <p className="text-muted-foreground">Select a form to fill out</p>
        </div>

        {forms.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No published forms available at the moment.</p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {forms.map((form) => (
              <Card key={form.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{form.title}</CardTitle>
                  {form.description && (
                    <CardDescription>{form.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate(`/forms/${form.id}`)}>
                    Fill Form
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicForms;
