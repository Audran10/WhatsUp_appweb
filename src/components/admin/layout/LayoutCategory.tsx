import React from 'react';

export const LayoutCategory: React.FC<{
  panelName: string;
  firstCategory: string;
  secondCategory: string;
  thirdCategory: string;
  fourthCategory?: string;
  children?: React.ReactNode;
}> = ({
  panelName,
  firstCategory,
  secondCategory,
  thirdCategory,
  fourthCategory,
  children,
}) => {
  if (fourthCategory) {
    return (
      <>
        <div className="text-center px-6 p-4 text-2xl border-b">
          {panelName}
        </div>
        <div className="w-full flex flex-col items-start h-max overflow-y-auto">
          <div className="flex flex-row justify-between w-full text-left border-b px-2 py-4">
            <div className="w-2/5 text-xl font-semibold">{firstCategory}</div>
            <div className="w-1/5 text-xl font-semibold">{secondCategory}</div>
            <div className="w-1/5 text-xl font-semibold">{thirdCategory}</div>
            <div className="w-1/5 text-xl font-semibold">{fourthCategory}</div>
            <div className="w-1/5 text-xl font-semibold text-center">
              Action
            </div>
          </div>
          {children}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="text-center px-6 p-4 text-2xl border-b">
          {panelName}
        </div>
        <div className="w-full flex flex-col items-start h-96 overflow-y-auto">
          <div className="flex flex-row justify-between w-full text-left border-b px-2 py-4">
            <div className="w-1/4 text-xl font-semibold">{firstCategory}</div>
            <div className="w-1/4 text-xl font-semibold">{secondCategory}</div>
            <div className="w-2/4 text-xl font-semibold">{thirdCategory}</div>
            <div className="w-1/4 text-xl font-semibold text-center">
              Action
            </div>
          </div>
          {children}
        </div>
      </>
    );
  }
};
