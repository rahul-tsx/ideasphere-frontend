import { FC } from 'react';

const Skeleton: FC = () => {
  return (
    <div className="animate-pulse bg-app_card_primary_bg shadow-app_card_primaryshadow rounded-lg p-6">
      <div className="h-48 bg-app_card_primaryborder rounded-lg mb-4"></div>
      <div className="h-6 bg-app_card_primaryborder rounded mb-4"></div>
      <div className="h-4 bg-app_card_primaryborder rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-app_card_primaryborder rounded mb-2 w-1/2"></div>
      <div className="h-4 bg-app_card_primaryborder rounded w-1/3"></div>
    </div>
  );
};

export default Skeleton;
