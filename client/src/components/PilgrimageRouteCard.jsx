import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Cloud, Thermometer, Wind } from 'lucide-react';

export default function PilgrimageRouteCard({ route }) {
  const getStatusBadge = () => {
    switch (route.status) {
      case 'safe': return { variant: 'outline', text: 'SAFE', color: 'text-risk-low' };
      case 'caution': return { variant: 'secondary', text: 'CAUTION', color: 'text-risk-medium' };
      case 'unsafe': return { variant: 'destructive', text: 'UNSAFE', color: 'text-risk-critical' };
      default: return { variant: 'outline', text: 'UNKNOWN', color: '' };
    }
  };

  const statusConfig = getStatusBadge();

  return (
    <Card className="min-w-[280px] hover-elevate" data-testid={`card-route-${route.id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
        <div className="flex items-start gap-2">
          <MapPin className="w-5 h-5 mt-0.5 text-primary" />
          <div>
            <h3 className="font-semibold text-base" data-testid="text-route-name">{route.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5" data-testid="text-distance">
              {route.distance} km
            </p>
          </div>
        </div>
        <Badge variant={statusConfig.variant} className={statusConfig.color} data-testid="badge-status">
          {statusConfig.text}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Cloud className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Weather</span>
          </div>
          <span data-testid="text-weather">{route.weather}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Thermometer className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Temp</span>
          </div>
          <span data-testid="text-temperature">{route.temperature}°C</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Wind className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Wind</span>
          </div>
          <span data-testid="text-wind">{route.windSpeed} km/h</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2"
          onClick={() => console.log('View route details:', route.id)}
          data-testid="button-view-route"
        >
          View Route Details
        </Button>
      </CardContent>
    </Card>
  );
}
