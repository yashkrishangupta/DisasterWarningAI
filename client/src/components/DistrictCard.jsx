import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Droplets, Mountain, TrendingUp } from 'lucide-react';

export default function DistrictCard({ district }) {
  const getRiskBadgeVariant = () => {
    switch (district.riskLevel) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  const getRiskColor = () => {
    switch (district.riskLevel) {
      case 'critical': return 'text-risk-critical';
      case 'high': return 'text-risk-high';
      case 'medium': return 'text-risk-medium';
      default: return 'text-risk-low';
    }
  };

  return (
    <Card 
      className="hover-elevate cursor-pointer"
      onClick={() => console.log('District clicked:', district.name)}
      data-testid={`card-district-${district.id}`}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <h3 className="font-semibold text-base" data-testid="text-district-name">{district.name}</h3>
        <Badge variant={getRiskBadgeVariant()} data-testid="badge-risk-level">
          {district.riskLevel.toUpperCase()}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-1">
            <Droplets className="w-5 h-5 text-blue-500" />
            <span className="text-xs text-muted-foreground">Rainfall</span>
            <span className={`text-sm font-semibold ${getRiskColor()}`} data-testid="text-rainfall">
              {district.rainfall}mm
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            <span className="text-xs text-muted-foreground">Soil</span>
            <span className={`text-sm font-semibold ${getRiskColor()}`} data-testid="text-soil">
              {district.soilMoisture}%
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Mountain className="w-5 h-5 text-gray-500" />
            <span className="text-xs text-muted-foreground">Slope</span>
            <span className={`text-sm font-semibold ${getRiskColor()}`} data-testid="text-slope">
              {district.slopeRisk}
            </span>
          </div>
        </div>
        <div className="mt-4 text-xs text-muted-foreground text-center" data-testid="text-updated">
          Updated {district.lastUpdated}
        </div>
      </CardContent>
    </Card>
  );
}
