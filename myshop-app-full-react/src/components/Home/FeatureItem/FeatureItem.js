
import FeatureBox from '../FeatureBox/FeatureBox';
import { featureItem } from './FeatureItemData';

// Feature Item List to be passed to FeatureBox as props


export let featureItemList = null;
featureItemList = featureItem.map((feature, id) => {
  return (
    <FeatureBox {...feature} key={id} />
  )
})