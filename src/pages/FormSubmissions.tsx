import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Download } from 'lucide-react';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';

interface Submission {
  id: string;
  submission_data: any;
  submitted_at: string;
}

const FormSubmissions = () => {
  const { formId } = useParams();
  const [formTitle, setFormTitle] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdminAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
      return;
    }
    loadFormData();
  }, [isAdminAuthenticated, formId]);

  const loadFormData = async () => {
    try {
      // Load form details
      const { data: form, error: formError } = await supabase
        .from('forms')
        .select('title')
        .eq('id', formId)
        .single();

      if (formError) throw formError;
      setFormTitle(form.title);

      // Load form fields
      const { data: formFields, error: fieldsError } = await supabase
        .from('form_fields')
        .select('*')
        .eq('form_id', formId)
        .order('order_index');

      if (fieldsError) throw fieldsError;
      setFields(formFields || []);

      // Load submissions
      const { data: formSubmissions, error: submissionsError } = await supabase
        .from('form_submissions')
        .select('*')
        .eq('form_id', formId)
        .order('submitted_at', { ascending: false });

      if (submissionsError) throw submissionsError;
      setSubmissions(formSubmissions || []);
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

  const exportToExcel = () => {
    const data = submissions.map((submission) => {
      const row: any = {
        'Submitted At': format(new Date(submission.submitted_at), 'MMM dd, yyyy hh:mm a'),
      };
      fields.forEach((field) => {
        row[field.label] = submission.submission_data[field.id] || '';
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');
    XLSX.writeFile(workbook, `${formTitle}_submissions.xlsx`);

    toast({
      title: "Success",
      description: "Submissions exported successfully",
    });
  };

  if (!isAdminAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate('/admin/forms')} variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Forms
            </Button>
            <h1 className="text-2xl font-bold">{formTitle} - Submissions</h1>
          </div>
          {submissions.length > 0 && (
            <Button onClick={exportToExcel} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export to Excel
            </Button>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Submissions ({submissions.length})</CardTitle>
            <CardDescription>View all form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No submissions yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Submitted At</TableHead>
                      {fields.map((field) => (
                        <TableHead key={field.id}>{field.label}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="whitespace-nowrap">
                          {format(new Date(submission.submitted_at), 'MMM dd, yyyy hh:mm a')}
                        </TableCell>
                        {fields.map((field) => (
                          <TableCell key={field.id}>
                            {Array.isArray(submission.submission_data[field.id])
                              ? submission.submission_data[field.id].join(', ')
                              : submission.submission_data[field.id] || '-'}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormSubmissions;
