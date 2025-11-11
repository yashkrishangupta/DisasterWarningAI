import { AlertTriangle, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AlertCard({ alert }) {
  const getBorderColor = () => {
    switch (alert.severity) {
      case 'critical': return 'border-l-4 border-l-risk-critical';
      case 'high': return 'border-l-4 border-l-risk-high';
      case 'medium': return 'border-l-4 border-l-risk-medium';
      default: return 'border-l-4 border-l-risk-low';
    }
  };

  const getBadgeVariant = () => {
    switch (alert.severity) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <Card className={`${getBorderColor()}`} data-testid={`card-alert-${alert.id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 mt-0.5 text-primary" />
          <div>
            <h3 className="font-semibold text-base" data-testid="text-alert-type">{alert.type}</h3>
            <Badge variant={getBadgeVariant()} className="mt-1" data-testid="badge-severity">
              {alert.severity.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span data-testid="text-location">{alert.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span data-testid="text-time">{alert.time}</span>
        </div>
        <p className="text-sm mt-2" data-testid="text-description">{alert.description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => console.log('View details for alert:', alert.id)}
          data-testid="button-view-details"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
