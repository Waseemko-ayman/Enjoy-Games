'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Key, Lock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CardHeaderContent from '@/components/ui/display/CardHeader';
import { SecuritySettingsFields } from '@/utils/constant';
import NotificationSwitch from '@/components/ui/display/NotificationSwitch';
import { useState } from 'react';
import { SessionCard } from '@/components/ui/display/SessionCard';
import SaveButton from '@/components/ui/common/SaveButton';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormField from '@/components/ui/FormField';
import { InputTypes } from '@/utils/type';

type FormValues = {
  newPassword: string;
  rePassword: string;
};

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const AcoountSchema = Yup.object().shape({
  newPassword: Yup.string()
    .matches(
      passwordRegex,
      'Must be at least 8 characters, include uppercase, lowercase, number, and special character.'
    )
    .required('Password is required'),
  rePassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Password must match')
    .required('Repeat password is required'),
});

const SecuritySettings = ({
  saving,
  success,
  handleSave,
}: {
  saving: boolean;
  success: boolean;
  handleSave: () => void;
}) => {
  const [checked, setChecked] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(AcoountSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log('Account Settings saved:', data);
    handleSave();
    reset();
  };

  return (
    <TabsContent value="security">
      <Card>
        <CardHeaderContent
          title="Security Settings"
          description="Manage your password and security preferences"
        />
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Change Password</h3>
              {/* <FormRow
                fields={SecuritySettingsFields}
                register={register}
                errors={errors}
              /> */}
              <div className="grid gap-4 md:grid-cols-2 w-full">
                {SecuritySettingsFields.map(({ id, name, type, ...rest }) => {
                  const formField = (
                    <div key={id}>
                      <FormField
                        id={id}
                        inputName={name}
                        type={type as InputTypes}
                        register={register}
                        error={errors[name as keyof FormValues]}
                        {...rest}
                      />
                    </div>
                  );
                  return formField;
                })}
              </div>
              <Button variant="outline" type="submit">
                <Lock className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </div>

            <div className="h-[1px] w-full bg-gray-300"></div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
              <NotificationSwitch
                id="two-factor"
                label="Enable Two-Factor Authentication"
                description="Add an extra layer of security to your account"
                checked={checked}
                onCheckedChange={(checked) => setChecked(checked)}
              />
              <Button variant="outline" disabled>
                <Key className="mr-2 h-4 w-4" />
                Set Up Two-Factor Authentication
              </Button>
            </div>

            <div className="h-[1px] w-full bg-gray-300"></div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Session Management</h3>
              <SessionCard
                browser="Chrome"
                os="Windows"
                ip="192.168.1.1"
                duration="2 hours"
              />
              {/* Exs: */}
              {/* <SessionCard
              browser="Firefox"
              os="MacOS"
              ip="192.168.1.2"
              duration="3 days"
              type="previous"
              isActive={false}
            />
            <SessionCard
              browser="Edge"
              os="Linux"
              ip="45.67.89.123"
              duration="15 minutes"
              type="suspicious"
            />
            <SessionCard
              browser="Safari"
              os="iOS"
              ip="192.168.1.3"
              duration="1 month"
              type="expired"
            /> */}

              <Button
                type="button"
                variant="outline"
                className="text-destructive"
              >
                Sign Out of All Other Sessions
              </Button>
            </div>

            <Alert className="mt-4">
              <Lock className="h-4 w-4" />
              <AlertTitle>API Access</AlertTitle>
              <AlertDescription>
                Your API keys allow access to your account. Keep them secure.
              </AlertDescription>
            </Alert>
            <SaveButton saving={saving} success={success} />
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SecuritySettings;
