import { VideoType } from '../Player/types/VideoType'
import { Player as MandiPlayer } from '@tika/mandi-player'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {
   setAdsPlaying,
} from "../../../slices/playerSlice";
import { BASE_ADS_URL } from '../../../globals';
import '@tika/mandi-player/dist/index.css';
import useActivityLog from "../../../hooks/activityWatchLog";
import {Item} from "../../../interfaces/interfaces";
import { RootState } from 'store';
import { updateUserAsync } from 'slices/userSlice';
import { useRouter } from 'next/router';

type Props = {
   item?: Item;
   video?: VideoType;
   src?: string;
   adsType: string;
}

export const Player = ({ item, video, src , adsType}: Props) => {
    const [cookies] = useCookies(["data"]);
   const [videoAds, setVideoAds] = useState<any>({});
   const [loading, setLoading] = useState<any>(true);
   const user = useSelector((state: RootState) => state.user.user);
   const dispatch = useDispatch();
    const { submitNewLog } = useActivityLog();
    useEffect(()=>{
      dispatch(updateUserAsync());
    },[])
   useEffect(()=>{
      if (!user?.subscription?.subscribed || adsType === "prediction") {
         axios({method: "get",
         url: BASE_ADS_URL + "api/v1/ads/campaigns/publisher/?ads_kind=0",
         headers: {
           Authorization: cookies.data?.ads_vas_video_data,
         },
         }).then((response) => {
           if (response.status === 200) {
            if (response.data.vast_url) {
               configVideoAds(response.data);
            }
            setLoading(false);
           }
         }).catch((err)=>{
            setLoading(false);
         })
      }
      else{
         setLoading(false);
      }
    },[])

    const configVideoAds = (videoAd: any) => {
      setVideoAds(
         {vastWaterfall: {
            skipDelay: adsType === "prediction" ? videoAd.duration : videoAd.skip_duration,
            preroll: [
              {
                ads: [
                  videoAd.vast_url,
                ],
              },
            ],
            midroll: [],
            postroll: [],
          },}
      )
    }

   return !loading ? (
      <>
         <MandiPlayer
            options={{
               playbackRates: [1, 1.25, 1.5, 2],
               sources: [
                  {
                     src: src || '',
                     type: 'application/x-mpegURL'
                  }
               ],
               poster: video?.cover ?? '/images/video--player/actor-cover.jpg', // TODO delete static poster
               tracks: [],
               controls: true,
               autoplay: true,
               responsive: true,
               fluid: true,
               techOrder: ['chromecast', 'html5'], // You may have more Tech, such as Flash or HLS
               liveui: true,
               html5: {
                  vhs: {
                     overrideNative: true,
                     experimentalBufferBasedABR: true,
                     experimentalLLHLS: true,
                     experimentalExactManifestTimings: true,
                     experimentalLeastPixelDiffSelector: true,
                     useNetworkInformationApi: true,
                     useDtsForTimestampOffset: true
                  }
               },
               plugins: {
                  httpSourceSelector: {
                     default: 'auto'
                  },
                  chromecast: { appId: 'videojs' },
                  hotkeys: {
                     volumeStep: 0.1,
                     seekStep: 5,
                     enableModifiersForNumbers: false
                  },
                  mobileUi: {
                     fullscreen: {
                        enterOnRotate: true,
                        exitOnRotate: true,
                        lockOnRotate: true,
                        lockToLandscapeOnEnter: false,
                        iOS: false,
                        disabled: false
                     },
                     touchControls: {
                        seekSeconds: 10,
                        tapTimeout: 300,
                        disableOnEnd: false,
                        disabled: false
                     }
                  },
                  seekButtons: {
                     forward: 30,
                     back: 10
                  },
                  aspectRatio: '16:9',
                  vttThumbnails: {
                     src: video?.videos[0].video?.vtt_link ? video?.videos[0].video?.vtt_link : ''
                  },
                  ...videoAds
               }
            }}
            adsUpdated={(ads: boolean) => {
               dispatch(setAdsPlaying(ads));
            }}
            onProgress={(current?: number) => {
                if (typeof current === "number" && item) {
                    submitNewLog(current, item.id, item.type);
                }
            }}
         />
         <style type='text/css'>
            {`
               .vjs-theme-dt {
               --color-bg: #12192199;
               --color-dark: #121921;
               --color-primary: #FFB901 !important;
               --shadow-xs: 0 1px 5px rgba(0, 0, 0, .18);
               --shadow-sm: 0 2px 8px rgba(0, 0, 0, .21);
               --shadow-focus: inset 0 0 0 3px #a2b0be;
               --shadow-focus-outer: 0 0 0 3px #a2b0be;
               font-family: ProximaNova, sans-serif;
               font-weight: 300;
            }
            .vjs-big-play-button {
               line-height: 0 !important;
               color: #FFB901 !important;
            }
            button .vjs-big-play-button .vjs-icon-placeholder:before {
               font-size: 2.6em !important;
            }
           `}
         </style>
      </>
   ):null
}
export default Player
