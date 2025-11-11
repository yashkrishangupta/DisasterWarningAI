import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, AlertCircle } from 'lucide-react';
import { submitCommunityReport } from '@/lib/api';

export default function CommunityReportForm() {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await submitCommunityReport(formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ type: '', location: '', description: '' });
      }, 3000);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card data-testid="card-community-report">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          Report Early Warning Signs
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Help your community by reporting early signs of disasters
        </p>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="text-center py-8 text-risk-low" data-testid="text-success">
            <AlertCircle className="w-12 h-12 mx-auto mb-3" />
            <p className="font-semibold">Report Submitted Successfully!</p>
            <p className="text-sm text-muted-foreground mt-1">Thank you for keeping our community safe.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Incident Type</Label>
              <Select 
                value={formData.type}
                onValueChange={(value) => setFormData({...formData, type: value})}
              >
                <SelectTrigger id="report-type" data-testid="select-type">
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flood">Flood/Water Logging</SelectItem>
                  <SelectItem value="landslide">Landslide/Rockfall</SelectItem>
                  <SelectItem value="crack">Ground Cracks</SelectItem>
                  <SelectItem value="water">Water Level Rise</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Enter location or nearest landmark"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="pl-9"
                  data-testid="input-location"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what you observed..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                data-testid="input-description"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={!formData.type || !formData.location || !formData.description || submitting}
              data-testid="button-submit"
            >
              {submitting ? 'Submitting...' : 'Submit Report'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
