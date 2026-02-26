import { useGetAllRecommendations, useGetCallerUserProfile } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingDown, Zap, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { formatTimestamp } from '../../lib/i18n';

export default function RecommendationsTab() {
  const { data: recommendations = [], isLoading } = useGetAllRecommendations();
  const { data: userProfile } = useGetCallerUserProfile();

  // Filter recommendations by user's preferred language
  const filteredRecommendations = recommendations.filter(
    rec => !userProfile || rec.language === userProfile.preferredLanguage
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-5 w-48 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-4 w-full bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Energy Insights</h2>
        <p className="text-muted-foreground">
          AI-powered recommendations to optimize your energy consumption
        </p>
      </div>

      {/* Summary Alert */}
      <Alert className="border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950">
        <TrendingDown className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <AlertTitle className="text-emerald-900 dark:text-emerald-100">
          Optimization Potential
        </AlertTitle>
        <AlertDescription className="text-emerald-800 dark:text-emerald-200">
          Based on current data, you could reduce energy consumption by up to 25% by implementing
          the recommendations below.
        </AlertDescription>
      </Alert>

      {filteredRecommendations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-muted mb-4">
              <Lightbulb className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Recommendations Yet</h3>
            <p className="text-muted-foreground text-center max-w-md px-4">
              Recommendations will appear here as the system analyzes your energy usage patterns.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredRecommendations.map((rec) => (
            <Card key={rec.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30 shrink-0">
                      <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base mb-1">
                        Energy Optimization Opportunity
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{rec.systemId}</Badge>
                        <Badge variant="secondary" className="text-xs">{rec.region}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(rec.timestamp, { 
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Zap className="h-5 w-5 text-emerald-500 shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{rec.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Additional Tips */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-base text-blue-900 dark:text-blue-100">
              General Energy Saving Tips
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <p>• Schedule HVAC systems to reduce operation during off-peak hours</p>
          <p>• Implement motion sensors for lighting in low-traffic areas</p>
          <p>• Regular maintenance of systems improves efficiency by up to 15%</p>
          <p>• Consider upgrading to LED lighting for 75% energy savings</p>
        </CardContent>
      </Card>
    </div>
  );
}
