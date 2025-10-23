import React, { useState } from 'react';
import { EmailService, EmailTemplateData } from '@/services/emailService';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface EmailComposerProps {
  isOpen: boolean;
  onClose: () => void;
  recipients: Array<{ email: string; name: string }>;
  eventName?: string;
}

const EmailComposer: React.FC<EmailComposerProps> = ({ 
  isOpen, 
  onClose, 
  recipients,
  eventName = 'Event'
}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSendEmail = async () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in both subject and message fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSending(true);

    try {
      const results = await EmailService.sendBulkEmails(
        recipients,
        subject,
        EmailService.generateEventEmailTemplate({
          eventName,
          applicantName: '', // Will be personalized in the template
          message,
        })
      );

      const successCount = results.filter(r => r.status === 'success').length;
      const errorCount = results.filter(r => r.status === 'error').length;

      toast({
        title: 'Emails Sent',
        description: `Successfully sent ${successCount} emails. ${errorCount > 0 ? `${errorCount} failed.` : ''}`,
      });

      onClose();
      setSubject('');
      setMessage('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send emails',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Send Email to Applicants</DialogTitle>
          <DialogDescription>
            Send a custom email to all {recipients.length} applicants of "{eventName}"
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject..."
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              rows={8}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSending}>
            Cancel
          </Button>
          <Button onClick={handleSendEmail} disabled={isSending}>
            {isSending ? 'Sending...' : `Send to ${recipients.length} Applicants`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailComposer;
