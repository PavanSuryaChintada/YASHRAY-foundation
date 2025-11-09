import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Cookie } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const sessionId = getSessionId();
    const checkConsent = async () => {
      const { data } = await supabase
        .from('cookie_consent')
        .select('*')
        .eq('session_id', sessionId)
        .single();

      if (!data) {
        setIsVisible(true);
      }
    };

    checkConsent();
  }, []);

  const getSessionId = () => {
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  };

  const handleAcceptAll = async () => {
    const sessionId = getSessionId();
    const consentData = {
      session_id: sessionId,
      consent_given: true,
      consent_types: {
        necessary: true,
        analytics: true,
        marketing: true,
      },
    };

    await supabase.from('cookie_consent').upsert(consentData);
    setIsVisible(false);
  };

  const handleAcceptSelected = async () => {
    const sessionId = getSessionId();
    const consentData = {
      session_id: sessionId,
      consent_given: true,
      consent_types: preferences,
    };

    await supabase.from('cookie_consent').upsert(consentData);
    setIsVisible(false);
  };

  const handleReject = async () => {
    const sessionId = getSessionId();
    const consentData = {
      session_id: sessionId,
      consent_given: false,
      consent_types: {
        necessary: true,
        analytics: false,
        marketing: false,
      },
    };

    await supabase.from('cookie_consent').upsert(consentData);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-end justify-center p-4">
      <Card className="w-full max-w-2xl bg-card border-border shadow-2xl animate-slide-up">
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Cookie className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Cookie Preferences</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReject}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            We use cookies to enhance your experience on our website. You can choose which 
            categories of cookies you allow us to use. For more information, please read our privacy policy.
          </p>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
              <Checkbox 
                id="necessary" 
                checked={preferences.necessary}
                disabled
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <div className="flex-1">
                <label htmlFor="necessary" className="text-sm font-medium text-foreground">
                  Necessary Cookies
                </label>
                <p className="text-xs text-muted-foreground">
                  Essential for website functionality and security
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
              <Checkbox 
                id="analytics" 
                checked={preferences.analytics}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, analytics: checked as boolean }))
                }
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <div className="flex-1">
                <label htmlFor="analytics" className="text-sm font-medium text-foreground">
                  Analytics Cookies
                </label>
                <p className="text-xs text-muted-foreground">
                  Help us understand how visitors interact with our website
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
              <Checkbox 
                id="marketing" 
                checked={preferences.marketing}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, marketing: checked as boolean }))
                }
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <div className="flex-1">
                <label htmlFor="marketing" className="text-sm font-medium text-foreground">
                  Marketing Cookies
                </label>
                <p className="text-xs text-muted-foreground">
                  Used to deliver personalized advertisements
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAcceptAll}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Accept All
            </Button>
            <Button
              onClick={handleAcceptSelected}
              variant="outline"
              className="flex-1"
            >
              Accept Selected
            </Button>
            <Button
              onClick={handleReject}
              variant="ghost"
              className="flex-1"
            >
              Reject All
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};