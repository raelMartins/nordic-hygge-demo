import {useState} from 'react';
import {AssetsList} from './AssetsList';
import {AssetInfo} from './AssetInfo';
import {drawer_styles} from '../navbar/Navbar';
import {ResponsivePopup, ResponsivePopupCloseButton, ResponsivePopupContent} from '@/ui-lib';

export const MyAssets = ({isAssetOpen, onAssetClose, onDrawerOpen}) => {
  const [tab, setTab] = useState('list');
  const [asset, setAsset] = useState(null);

  const go_back = () => {
    setAsset(null);
    setTab(`list`);
  };

  const closeDrawer = () => {
    onAssetClose();
    go_back();
  };

  const handleManageAssets = property => {
    console.log(property);
    setAsset(property);
    setTab(`info`);
    // property?.type == 'WHOLE' &&
    //   !property?.payment_plan &&
    //   !property?.co_owners?.length &&
    //   router.push(`/asset/outright/${property?.id}?status=${paymentStatus}`);

    // property?.type == 'WHOLE' &&
    //   property?.payment_plan &&
    //   !property?.co_owners?.length &&
    //   router.push(`/asset/payment_plan/${property?.id}?status=${paymentStatus}`);

    // property?.type == 'WHOLE' &&
    //   property?.co_owners?.length &&
    //   router.push(`/asset/co_ownership/${property?.id}?status=${paymentStatus}`);

    // property?.type == 'FRACTIONAL' &&
    //   property?.co_owners?.length > 0 &&
    //   router.push(`/asset/fractional/${property?.id}?status=${paymentStatus}`);

    // property?.type == 'FRACTIONAL' &&
    //   router.push(`/asset/fractional/${property?.id}?status=${paymentStatus}`);
    // onAssetClose();
  };

  const assets_content = {
    list: <AssetsList handleManageAssets={handleManageAssets} go_back={go_back} />,
    info: <AssetInfo property={asset} handleManageAssets={handleManageAssets} go_back={go_back} />,
  }[tab];

  return (
    <ResponsivePopup
      autoFocus={false}
      placement="right"
      scrollBehavior="inside"
      isOpen={isAssetOpen}
      onClose={closeDrawer}
    >
      {/* {isNotMobile && <DrawerOverlay />} */}
      <ResponsivePopupContent {...drawer_styles}>
        <ResponsivePopupCloseButton />

        {assets_content}
      </ResponsivePopupContent>
    </ResponsivePopup>
  );
};

export default MyAssets;
