'use client';
import InputEditor from '@/components/InputEditor';
import BannerCon from '@/components/BannerCon';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setOriginPath, setOriginStr} from '@/features/home/homeSlice';
import { useTranslations } from 'next-intl';
import './index.css';
import { setIsShowVerify } from '@/features/home/homeSlice';
import SlideReveal from '@/components/SlideReveal';
import React, { useEffect } from 'react';
export default function Home() {
  const t = useTranslations('removePeople');
  const router = useRouter();
  const dispatch = useDispatch();
  const homeState = useSelector((state) => state.home);
  const { isVerified } = homeState;
  useEffect(() => {
    console.log('isVerified',isVerified)
    if (isVerified){
      router.push('/remove-people-from-photos');
    }
  }, [isVerified]);
  
  const handleUpload = (originfile,filePath) => {
    dispatch(setOriginPath(filePath));
  };
  const onEnter = (str) => {
    dispatch(setOriginStr(str));
    dispatch(setIsShowVerify({isShowVerify:true}));
  };
  const bannerData = {
    title:t('removeTitle'),
    arr:[
      t('removeTip'),
      t('removeTipTwo') 
    ]
  }
  let examples = [
    {
      before:"/examples/1.png",
      after:"/examples/2.png",
    },
    {
      before:"/examples/3.png",
      after:"/examples/4.png",
    },
    {
      before:"/examples/5.png",
      after:"/examples/6.png",
    },

  ]
  const exampleNode = examples.map( (v,i) =>{
    let res = (
      <SlideReveal
          topSrc={v.after}
          bottomSrc={v.before}
          key={'hoverReveal' + i}
          alt="compare image"
        />

    )
    return res
  })
  
  return (
    <div className="homePage">
      <BannerCon data={bannerData}/>
      <InputEditor
        str={''}
        onFileChange={handleUpload}
        onEnter={onEnter}
      />
      
      
      <div className="exempleBox">
        {exampleNode}

      </div>
      
    </div>
  );
}
