import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Bell, Plus, Edit, Trash2 } from 'lucide-react';
import { useGetAllAlarmConfigs, useDeleteAlarmConfig, useUpdateAlarmConfig } from '../../hooks/useQueries';
import AddAlarmDialog from './AddAlarmDialog';
import EditAlarmDialog from './EditAlarmDialog';
import type { AlarmConfig } from '../../types';
import { formatAlarmTime } from '../../lib/alarmService';

export default function AlarmsTab() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState<AlarmConfig | null>(null);

  const { data: alarms = [], isLoading } = useGetAllAlarmConfigs();
  const deleteAlarmMutation = useDeleteAlarmConfig();
  const updateAlarmMutation = useUpdateAlarmConfig();

  const handleToggleAlarm = async (alarm: AlarmConfig) => {
    const updatedAlarm: AlarmConfig = {
      ...alarm,
      isActive: !alarm.isActive,
      updatedAt: BigInt(Date.now() * 1000000),
    };
    try {
      await updateAlarmMutation.mutateAsync(updatedAlarm);
    } catch (error) {
      console.error('Failed to toggle alarm:', error);
    }
  };

  const handleDeleteAlarm = async (alarmId: string) => {
    if (confirm('Are you sure you want to delete this alarm?')) {
      try {
        await deleteAlarmMutation.mutateAsync(alarmId);
      } catch (error) {
        console.error('Failed to delete alarm:', error);
      }
    }
  };

  const handleEditAlarm = (alarm: AlarmConfig) => {
    setSelectedAlarm(alarm);
    setEditDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading alarms...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Morning Alarms</h2>
          <p className="text-muted-foreground">
            Set up personalized morning updates with energy insights
          </p>
        </div>
        <Button onClick={() => setAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Alarm
        </Button>
      </div>

      <div className="grid gap-4">
        {alarms.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                No alarms configured yet. Add your first morning alarm to get started!
              </p>
            </CardContent>
          </Card>
        ) : (
          alarms.map((alarm) => (
            <Card key={alarm.alarmId}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      {formatAlarmTime(alarm.wakeUpTime)}
                    </CardTitle>
                    <CardDescription>
                      {alarm.language} • {alarm.ringTone} • {alarm.alertBeep}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={alarm.isActive}
                      onCheckedChange={() => handleToggleAlarm(alarm)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditAlarm(alarm)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteAlarm(alarm.alarmId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Morning Update Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-start gap-2">
            <Bell className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Weather & Energy Summary</p>
              <p className="text-sm text-muted-foreground">
                Get current weather and your overnight energy consumption
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Bell className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Voice-Guided Updates</p>
              <p className="text-sm text-muted-foreground">
                Hear your energy insights in your preferred language
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Bell className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Motivational Messages</p>
              <p className="text-sm text-muted-foreground">
                Start your day with energy-saving tips and encouragement
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddAlarmDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
      {selectedAlarm && (
        <EditAlarmDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          alarm={selectedAlarm}
        />
      )}
    </div>
  );
}
