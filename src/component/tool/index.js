import scriptjs from 'scriptjs';
export const URLS={
  GOOGLEMAP:'https://maps.googleapis.com/maps/api/js?key=AIzaSyCCa8v-6lnxNMxeh6KL35ffPSEQHDZDS1g&libraries=places',
  MARKERCLUSTERER:'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js',
}
export const load=(url)=>{
  return new Promise((resolve=e=>e)=>{
    scriptjs(url,resolve);
  })
}

export const loadAll=async ()=>{
  const {
    google,
    MarkerClusterer
  }=window;
  if(!google){
    await load(URLS.GOOGLEMAP);
  }
  if(!MarkerClusterer){
    await load(URLS.MARKERCLUSTERER);
  }
}
