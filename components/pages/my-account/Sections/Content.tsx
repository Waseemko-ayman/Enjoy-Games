'use client';
import React from 'react';
import Form from './Form';
import Container from '@/components/organism/Container';
import Layer from '@/components/atomic/Layer';
import WarningMessage from './WarningMessage';
import AccountOptions from './AccountOptions';
import Button from '@/components/atomic/Button';
import { MdSave } from 'react-icons/md';
import StepIndicator from './StepIndicator';
import Stats from './Stats';
import InvitationLink from './InvitationLink';
import DeleteAccount from './DeleteAccount';
import ProfilePicture from './ProfilePicture';
import useIsMobile from '@/hook/useIsMobile';

const Content = () => {
  const isMobile = useIsMobile();

  return (
    <Layer>
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Form */}
          <form className="flex-1">
            {isMobile && <ProfilePicture />}
            <div className="space-y-6 max-[991px]:mt-3">
              {/* Account Information */}
              <Form />

              {/* Warning Message */}
              <WarningMessage />

              {/* Account Options */}
              <AccountOptions />

              <Button
                type="submit"
                otherClassName="py-3 px-8 mt-10"
                Icon={MdSave}
                iconPosition="right"
              >
                حفظ
              </Button>
            </div>
          </form>

          {/* Right Side - Profile Section */}
          {!isMobile && (
            <div className="space-y-6">
              {/* Profile Picture Section */}
              <ProfilePicture />

              {/* Step Indicator */}
              <StepIndicator />

              {/* Stats */}
              <Stats />

              {/* Invitation Link */}
              <InvitationLink />

              {/* Delete Account */}
              <DeleteAccount />
            </div>
          )}
        </div>
      </Container>
    </Layer>
  );
};

export default Content;
