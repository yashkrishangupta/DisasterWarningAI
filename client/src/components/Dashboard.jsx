import { useState, useEffect } from 'react';
import Header from './Header';
import RiskIndicator from './RiskIndicator';
import AlertCard from './AlertCard';
import DistrictCard from './DistrictCard';
import PilgrimageRouteCard from './PilgrimageRouteCard';
import CommunityReportForm from './CommunityReportForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { MapPin, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { fetchDistricts, fetchAlerts, fetchPilgrimageRoutes, fetchCommunityReports, fetchOverallRisk } from '@/lib/api';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [overallRisk, setOverallRisk] = useState({ flood: 0, landslide: 0 });
  const [alerts, setAlerts] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    // Refresh data every 5 minutes
    const interval = setInterval(loadData, 300000);
    return () => clearInterval(interval);
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      
      // Try to fetch from API, fallback to mock data
      try {
        const [riskData, alertsData, districtsData, routesData, reportsData] = await Promise.all([
          fetchOverallRisk(),
          fetchAlerts(),
          fetchDistricts(),
          fetchPilgrimageRoutes(),
          fetchCommunityReports()
        ]);
        
        setOverallRisk(riskData);
        setAlerts(alertsData);
        setDistricts(districtsData);
        setRoutes(routesData);
        setReports(reportsData);
      } catch (apiError) {
        console.log('Using mock data - Backend not available');
        // Use mock data
        setOverallRisk({ flood: 68, landslide: 45 });
        setAlerts(getMockAlerts());
        setDistricts(getMockDistricts());
        setRoutes(getMockRoutes());
        setReports(getMockReports());
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  function getMockAlerts() {
    return [
      {
        id: 1,
        type: 'Flash Flood Warning',
        severity: 'critical',
        location: 'Kedarnath Valley',
        time: '2 hours ago',
        description: 'Heavy rainfall expected. River water levels rising rapidly. Immediate evacuation recommended for low-lying areas.'
      },
      {
        id: 2,
        type: 'Landslide Alert',
        severity: 'high',
        location: 'Badrinath Highway',
        time: '4 hours ago',
        description: 'Soil moisture levels critical. Road closure advised for next 24 hours. Alternative routes available.'
      },
      {
        id: 3,
        type: 'Weather Advisory',
        severity: 'medium',
        location: 'Dehradun District',
        time: '6 hours ago',
        description: 'Moderate rainfall expected. Monitor weather updates and avoid unnecessary travel.'
      }
    ];
  }

  function getMockDistricts() {
    return [
      {id: 1, name: 'Chamoli', riskLevel: 'critical', rainfall: 125, soilMoisture: 87, slopeRisk: 'High', lastUpdated: '15 min ago'},
      {id: 2, name: 'Rudraprayag', riskLevel: 'high', rainfall: 98, soilMoisture: 72, slopeRisk: 'Med', lastUpdated: '20 min ago'},
      {id: 3, name: 'Dehradun', riskLevel: 'medium', rainfall: 45, soilMoisture: 48, slopeRisk: 'Low', lastUpdated: '10 min ago'},
      {id: 4, name: 'Uttarkashi', riskLevel: 'high', rainfall: 89, soilMoisture: 65, slopeRisk: 'High', lastUpdated: '18 min ago'},
      {id: 5, name: 'Haridwar', riskLevel: 'low', rainfall: 32, soilMoisture: 35, slopeRisk: 'Low', lastUpdated: '25 min ago'},
      {id: 6, name: 'Tehri Garhwal', riskLevel: 'medium', rainfall: 56, soilMoisture: 54, slopeRisk: 'Med', lastUpdated: '12 min ago'}
    ];
  }

  function getMockRoutes() {
    return [
      {id: 1, name: 'Kedarnath', distance: 18, status: 'caution', weather: 'Heavy Rain', temperature: 12, windSpeed: 18},
      {id: 2, name: 'Badrinath', distance: 45, status: 'unsafe', weather: 'Severe Storm', temperature: 10, windSpeed: 25},
      {id: 3, name: 'Gangotri', distance: 100, status: 'safe', weather: 'Partly Cloudy', temperature: 14, windSpeed: 8},
      {id: 4, name: 'Yamunotri', distance: 65, status: 'caution', weather: 'Light Rain', temperature: 11, windSpeed: 12}
    ];
  }

  function getMockReports() {
    return [
      {id: 1, type: 'crack', location: 'Joshimath', description: 'Multiple cracks appearing on road surface near temple area.', timeAgo: '3 hours ago'},
      {id: 2, type: 'water', location: 'Rishikesh', description: 'River Ganga flowing at normal levels, no signs of flooding.', timeAgo: '5 hours ago'},
      {id: 3, type: 'landslide', location: 'Gopeshwar', description: 'Small rocks falling near highway, advised to avoid the area.', timeAgo: '1 hour ago'}
    ];
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onMenuClick={() => console.log('Menu clicked')} />
        <main className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading disaster data...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => console.log('Menu clicked')} />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid" data-testid="tabs-navigation">
            <TabsTrigger value="dashboard" className="gap-2" data-testid="tab-dashboard">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2" data-testid="tab-alerts">
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="routes" className="gap-2" data-testid="tab-routes">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Pilgrimage Routes</span>
            </TabsTrigger>
            <TabsTrigger value="report" className="gap-2" data-testid="tab-report">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Report</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl">Current Risk Assessment</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Real-time AI predictions for Uttarakhand region
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-center gap-8 py-4">
                  <RiskIndicator percentage={overallRisk.flood} label="Flood Risk" />
                  <RiskIndicator percentage={overallRisk.landslide} label="Landslide Risk" />
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-xl font-semibold mb-4">Active Alerts</h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {alerts.slice(0, 2).map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => setActiveTab('alerts')}
                data-testid="button-view-all-alerts"
              >
                View All Alerts
              </Button>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">District-wise Risk Map</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {districts.map(district => (
                  <DistrictCard key={district.id} district={district} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold mb-4">All Active Alerts</h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {alerts.map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="routes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Char Dham Yatra Route Safety
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Real-time safety status for pilgrimage routes
                </p>
              </CardHeader>
              <CardContent>
                <ScrollArea className="w-full">
                  <div className="flex gap-4 pb-4">
                    {routes.map(route => (
                      <PilgrimageRouteCard key={route.id} route={route} />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-xl font-semibold mb-4">Route-specific Districts</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {districts.filter(d => ['Chamoli', 'Rudraprayag', 'Uttarkashi'].includes(d.name)).map(district => (
                  <DistrictCard key={district.id} district={district} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="report" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <CommunityReportForm />
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Community Reports</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Latest reports from local communities
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reports.slice(0, 5).map((report) => {
                      const getBorderColor = () => {
                        if (report.type === 'landslide' || report.type === 'flood') return 'border-l-risk-high';
                        if (report.type === 'crack' || report.type === 'water') return 'border-l-risk-medium';
                        return 'border-l-risk-low';
                      };
                      
                      return (
                        <div key={report.id} className={`border-l-4 ${getBorderColor()} pl-4 py-2`}>
                          <p className="font-semibold text-sm capitalize">{report.type.replace('_', ' ')}</p>
                          <p className="text-xs text-muted-foreground">{report.location} • {report.timeAgo}</p>
                          <p className="text-sm mt-1">{report.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
