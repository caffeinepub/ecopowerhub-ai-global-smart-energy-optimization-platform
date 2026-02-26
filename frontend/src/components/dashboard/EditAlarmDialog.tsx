import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useUpdateAlarmConfig } from '../../hooks/useQueries';
import type { AlarmConfig } from '../../types';

interface EditAlarmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alarm: AlarmConfig;
}

export default function EditAlarmDialog({ open, onOpenChange, alarm }: EditAlarmDialogProps) {
  const [wakeUpTime, setWakeUpTime] = useState('07:00');
  const [ringTone, setRingTone] = useState('default');
  const [alertBeep, setAlertBeep] = useState('gentle');
  const [language, setLanguage] = useState('English');
  const [isActive, setIsActive] = useState(true);

  const updateAlarmMutation = useUpdateAlarmConfig();

  useEffect(() => {
    if (alarm) {
      const date = new Date(Number(alarm.wakeUpTime) / 1000000);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      setWakeUpTime(`${hours}:${minutes}`);
      setRingTone(alarm.ringTone);
      setAlertBeep(alarm.alertBeep);
      setLanguage(alarm.language);
      setIsActive(alarm.isActive);
    }
  }, [alarm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const [hours, minutes] = wakeUpTime.split(':').map(Number);
    const now = new Date();
    const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    const timestamp = BigInt(alarmDate.getTime() * 1000000);

    const updatedAlarm: AlarmConfig = {
      ...alarm,
      wakeUpTime: timestamp,
      ringTone,
      alertBeep,
      language,
      isActive,
      updatedAt: BigInt(Date.now() * 1000000),
    };

    try {
      await updateAlarmMutation.mutateAsync(updatedAlarm);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to update alarm:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Morning Alarm</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="wakeUpTime">Wake Up Time</Label>
              <Input
                id="wakeUpTime"
                type="time"
                value={wakeUpTime}
                onChange={(e) => setWakeUpTime(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ringTone">Ring Tone</Label>
              <Select value={ringTone} onValueChange={setRingTone}>
                <SelectTrigger id="ringTone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="gentle">Gentle</SelectItem>
                  <SelectItem value="energetic">Energetic</SelectItem>
                  <SelectItem value="nature">Nature Sounds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="alertBeep">Alert Beep</Label>
              <Select value={alertBeep} onValueChange={setAlertBeep}>
                <SelectTrigger id="alertBeep">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gentle">Gentle</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="loud">Loud</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="Mandarin">Mandarin</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Swahili">Swahili</SelectItem>
                  <SelectItem value="Arabic">Arabic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isActive">Active</Label>
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateAlarmMutation.isPending}>
              {updateAlarmMutation.isPending ? 'Updating...' : 'Update Alarm'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
