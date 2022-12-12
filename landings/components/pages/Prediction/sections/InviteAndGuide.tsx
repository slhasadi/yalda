import Modal from "components/commons/Modal/Modal";
import Image from "next/image";
import {useRouter} from "next/router";
import {useState} from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import {RWebShare} from "react-web-share";

const InviteAndGuide = () => {
    const router = useRouter()
    

    return <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4 py-12">

            <div className="relative cursor-pointer">

                <RWebShare
                    data={{
                        text: 'سلام خوبی؟ ازت میخوام از طریق این لینک مسابقه رو پیش بینی کنی. فکر میکنی تو درست حدس میزنی یا من؟',
                        url: router.asPath,
                        title: 'پیش بینی جام جهانی',
                    }}
                >
                    <Image src='/images/fake/prediction/invite-friends.png' width={556} height={220} layout='responsive' alt='invite' objectFit='contain'/>
                </RWebShare>
            </div>

            <div className="relative cursor-pointer">
                <Image src='/images/fake/prediction/guide-scores.png' width={556} height={220} layout='responsive' alt='invite' objectFit='contain'/>
            </div>
        </div>
    </>
}

export default InviteAndGuide;
