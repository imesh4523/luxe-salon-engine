import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Settings, CreditCard, Mail, Bell, Shield, Save, Eye, EyeOff,
  CheckCircle, AlertTriangle, Loader2, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface SystemSetting {
  id: string;
  key: string;
  value: string | null;
  is_secret: boolean;
  category: string;
  description: string | null;
}

const useSystemSettings = () => {
  return useQuery({
    queryKey: ['system-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .order('category', { ascending: true });
      
      if (error) throw error;
      return data as SystemSetting[];
    },
  });
};

const useUpdateSetting = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase
        .from('system_settings')
        .update({ value })
        .eq('key', key);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-settings'] });
    },
  });
};

const SettingInput = ({ 
  setting, 
  value, 
  onChange,
  onSave,
  isSaving 
}: { 
  setting: SystemSetting;
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  isSaving: boolean;
}) => {
  const [showSecret, setShowSecret] = useState(false);
  const isModified = value !== (setting.value || '');

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={setting.key} className="text-sm font-medium">
          {setting.description || setting.key}
        </Label>
        {setting.is_secret && (
          <Badge variant="secondary" className="text-xs">
            <Shield className="h-3 w-3 mr-1" />
            Secret
          </Badge>
        )}
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            id={setting.key}
            type={setting.is_secret && !showSecret ? 'password' : 'text'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={setting.is_secret ? '••••••••' : `Enter ${setting.description?.toLowerCase()}`}
            className="bg-muted/50 pr-10"
          />
          {setting.is_secret && (
            <button
              type="button"
              onClick={() => setShowSecret(!showSecret)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        {isModified && (
          <Button 
            size="sm" 
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

const SettingSwitch = ({ 
  setting, 
  value, 
  onChange,
  onSave,
  isSaving 
}: { 
  setting: SystemSetting;
  value: boolean;
  onChange: (value: boolean) => void;
  onSave: () => void;
  isSaving: boolean;
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <Label htmlFor={setting.key} className="text-sm font-medium">
          {setting.description || setting.key}
        </Label>
      </div>
      <Switch
        id={setting.key}
        checked={value}
        onCheckedChange={(checked) => {
          onChange(checked);
          // Auto-save for switches
          setTimeout(onSave, 100);
        }}
        disabled={isSaving}
      />
    </div>
  );
};

export const SystemSettings = () => {
  const { data: settings, isLoading, refetch } = useSystemSettings();
  const updateSetting = useUpdateSetting();
  const [localValues, setLocalValues] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);

  useEffect(() => {
    if (settings) {
      const values: Record<string, string> = {};
      settings.forEach(s => {
        values[s.key] = s.value || '';
      });
      setLocalValues(values);
    }
  }, [settings]);

  const handleSave = async (key: string) => {
    setSavingKey(key);
    try {
      await updateSetting.mutateAsync({ key, value: localValues[key] });
      toast.success('Setting saved successfully');
    } catch (error) {
      toast.error('Failed to save setting');
    }
    setSavingKey(null);
  };

  const getSettingsByCategory = (category: string) => {
    return settings?.filter(s => s.category === category) || [];
  };

  const getBooleanValue = (key: string) => {
    return localValues[key] === 'true';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            System Settings
          </h2>
          <p className="text-muted-foreground">
            Configure API keys, email settings, and platform options
          </p>
        </div>
        <Button variant="outline" onClick={() => refetch()} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="payment" className="space-y-6">
        <TabsList className="glass-card border border-border/50">
          <TabsTrigger value="payment" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="email" className="gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="platform" className="gap-2">
            <Settings className="h-4 w-4" />
            Platform
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Payment Settings */}
        <TabsContent value="payment">
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                PayHere Payment Gateway
              </CardTitle>
              <CardDescription>
                Configure PayHere credentials for processing customer payments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {getSettingsByCategory('payment').map((setting) => (
                setting.key === 'payhere_sandbox_mode' ? (
                  <SettingSwitch
                    key={setting.key}
                    setting={setting}
                    value={getBooleanValue(setting.key)}
                    onChange={(val) => setLocalValues(prev => ({ ...prev, [setting.key]: val ? 'true' : 'false' }))}
                    onSave={() => handleSave(setting.key)}
                    isSaving={savingKey === setting.key}
                  />
                ) : (
                  <SettingInput
                    key={setting.key}
                    setting={setting}
                    value={localValues[setting.key] || ''}
                    onChange={(val) => setLocalValues(prev => ({ ...prev, [setting.key]: val }))}
                    onSave={() => handleSave(setting.key)}
                    isSaving={savingKey === setting.key}
                  />
                )
              ))}

              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span>Sandbox mode uses PayHere test environment. Disable for production.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email Configuration
              </CardTitle>
              <CardDescription>
                Configure SMTP or Resend for sending emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Provider Selection */}
              <div className="space-y-2">
                <Label>Email Provider</Label>
                <Select
                  value={localValues['email_provider'] || 'smtp'}
                  onValueChange={(val) => {
                    setLocalValues(prev => ({ ...prev, email_provider: val }));
                    handleSave('email_provider');
                  }}
                >
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smtp">SMTP Server</SelectItem>
                    <SelectItem value="resend">Resend</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {localValues['email_provider'] === 'resend' ? (
                <>
                  {getSettingsByCategory('email')
                    .filter(s => s.key === 'resend_api_key' || s.key === 'smtp_from_email' || s.key === 'smtp_from_name')
                    .map((setting) => (
                      <SettingInput
                        key={setting.key}
                        setting={setting}
                        value={localValues[setting.key] || ''}
                        onChange={(val) => setLocalValues(prev => ({ ...prev, [setting.key]: val }))}
                        onSave={() => handleSave(setting.key)}
                        isSaving={savingKey === setting.key}
                      />
                    ))}
                </>
              ) : (
                <>
                  {getSettingsByCategory('email')
                    .filter(s => s.key !== 'resend_api_key' && s.key !== 'email_provider')
                    .map((setting) => (
                      <SettingInput
                        key={setting.key}
                        setting={setting}
                        value={localValues[setting.key] || ''}
                        onChange={(val) => setLocalValues(prev => ({ ...prev, [setting.key]: val }))}
                        onSave={() => handleSave(setting.key)}
                        isSaving={savingKey === setting.key}
                      />
                    ))}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platform Settings */}
        <TabsContent value="platform">
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Platform Configuration
              </CardTitle>
              <CardDescription>
                General platform settings and business rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {getSettingsByCategory('platform').map((setting) => {
                const isBoolean = setting.value === 'true' || setting.value === 'false';
                
                return isBoolean ? (
                  <SettingSwitch
                    key={setting.key}
                    setting={setting}
                    value={getBooleanValue(setting.key)}
                    onChange={(val) => setLocalValues(prev => ({ ...prev, [setting.key]: val ? 'true' : 'false' }))}
                    onSave={() => handleSave(setting.key)}
                    isSaving={savingKey === setting.key}
                  />
                ) : (
                  <SettingInput
                    key={setting.key}
                    setting={setting}
                    value={localValues[setting.key] || ''}
                    onChange={(val) => setLocalValues(prev => ({ ...prev, [setting.key]: val }))}
                    onSave={() => handleSave(setting.key)}
                    isSaving={savingKey === setting.key}
                  />
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure email notifications for various events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {getSettingsByCategory('notifications').map((setting) => {
                const isBoolean = setting.value === 'true' || setting.value === 'false';
                
                return isBoolean ? (
                  <SettingSwitch
                    key={setting.key}
                    setting={setting}
                    value={getBooleanValue(setting.key)}
                    onChange={(val) => setLocalValues(prev => ({ ...prev, [setting.key]: val ? 'true' : 'false' }))}
                    onSave={() => handleSave(setting.key)}
                    isSaving={savingKey === setting.key}
                  />
                ) : (
                  <SettingInput
                    key={setting.key}
                    setting={setting}
                    value={localValues[setting.key] || ''}
                    onChange={(val) => setLocalValues(prev => ({ ...prev, [setting.key]: val }))}
                    onSave={() => handleSave(setting.key)}
                    isSaving={savingKey === setting.key}
                  />
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
