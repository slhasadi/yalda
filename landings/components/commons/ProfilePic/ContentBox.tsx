import { useState } from 'react';
import { Collapse } from 'react-collapse';


const ContentBox = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <footer className="w-11/12 md:w-8/12 mt-8 flex flex-row justify-center items-center">
            <div className="w-full py-4 rounded-lg flex flex-col items-center justify-start border-2 border-gainsboro">
                <div className="w-10/12 flex flex-col items-center justify-start">
                    <h1 className="my-4 font-yekanBakh text-2xl font-bold">
                        عکس عید نوروز 1401
                    </h1>
                    <p className="font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                        برای میلیون‌ها نفر در سراسر جهان، نوروز جشن کوچکی نیست. سازمان ملل مطرح می‌کند که «نوروز ارزش‌های صلح و همبستگی را میان نسل‌ها و درون خانواده ترویج می‌دهد.» نوروز زمان آشتی، صلح و کمک به تنوع فرهنگی و دوستی بین مردم و جوامع مختلف است. بنابراین، سال جدید برای ما ایرانی‌ها اهمیت بسیار زیادی دارد و ما در روزهای آغاز سال جدید نه‌تنها جشن می‌گیریم، بلکه برای به یاد داشتن این روزها از عکس عید نوروز غافل نمی‌شویم.
                    </p>
                    <p className="font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                        ممکن است شما نیز برای نوروز امسال به دنبال عکس عید نوروز 1401 باشید و بخواهید با قرار دادن این تصویر بر روی پروفایل شبکه‌های اجتماعی خود و حتی عکس پس‌زمینه گوشی، سال جدید را به خود و دیگران یادآوری کنید. بنابراین، اگر به دنبال عکس عید نوروز در ایران هستید در ادامه با ما همراه باشید.
                    </p>
                    <div className='w-full'>
                        <Collapse isOpened={isOpen}>
                            <h2 className="my-4 font-yekanBakh text-xl font-bold">
                                عکس نوشته نوروز
                            </h2>
                            <p className="font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                نوروز سال نو ایرانی است. تقویم ایرانی یک تقویم شمسی است و این به این معنی است که زمان از طریق مشاهدات نجومی با حرکت زمین به دور خورشید مشخص می‌شود. بنابراین، اولین روز سال در این تقویم، همیشه با پدیده طبیعی اعتدال بهاری آغاز می‌شود. ممکن است برای این روزهای خاص از سال به دنبال عکس نوشته برای پروفایل خود باشید.
                            </p>
                            <p className="font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                نوشته‌ها و شعرهای مختلفی در مورد نوروز وجود دارند که می‌توانید آن‌ها را با عکس‌های بهاری ترکیب کنید و تصویری زیبا برای عکس عید نوروز 1401 بسازید. استفاده از متن‌های اهنگ عید نوروز و اشعار شاعران معروف در عکس عید نوروز می‌تواند ایده بسیار خوبی باشد. با این کار می‌توانید به دیگران عید را پيشاپيش مبارك باد بگویید. یکی از اشعار زیبا در این زمینه، شعری از حافظ است:
                            </p>
                            <p className="mr-7 font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                ز کوی یار می‌آید نسیم باد نوروزی
                            </p>
                            <p className="mr-7 font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                از این باد ار مدد خواهی چراغ دل برافروزی
                            </p>
                            <p className="font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                شعر معروفی دیگر در مورد عید نوروز از خیام است:
                            </p>
                            <p className="mr-7 font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                بر چهره گل نسیم نوروز خوش است
                            </p>
                            <p className="mr-7 font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                در صحن چمن روی دل‌افروز خوش است
                            </p>
                            <p className="font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                یکی دیگر از اشعار معروف در مورد نوروز، متعلق به شاعر معاصر، ملک‌الشعرای بهار است که در ادامه یک بیت از آن آورده شده است:
                            </p>
                            <p className="mr-7 font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                رسید موکب نوروز و چشم فتنه غنود

                            </p>
                            <p className="mr-7 font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                درود باد بر این موکب خجسته، درود
                            </p>
                            <h2 className="my-4 font-yekanBakh text-xl font-bold">
                                عکس پروفایل نوروز خاص
                            </h2>
                            <p className="font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                نوروز یک تعطیلات مذهبی نیست، بلکه جشنی جهانی برای شروعی جدید است. در این زمان ما از آینده استقبال می‌کنیم و گذشته را دور می‌ریزیم. به همین دلیل، تمیز کردن خانه و خرید لباس‌های نو همیشه در برنامه‌های نوروز در نظر گرفته می‌شوند. از سوی دیگر، با ظهور شبکه‌های اجتماعی، تغییر عکس پروفایل خود به عکس عید نوروز در ایران می‌تواند نمادی از شروعی تازه در سال جدید باشد و همچنین، می‌تواند ایده مناسبی برای تبريك پيشاپيش عید باشد. بنابراین، اگر به دنبال عکس عید نوروز 1401 و عکس عید نوروز کودکانه هستید می‌توانید در این مورد، ایده‌های مختلفی را در نظر بگیرید.
                            </p>
                            <p className="font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                اگر در اینترنت، برای عکس عید نوروز در ایران را جستجو کنید احتمالا تصاویر مختلفی از سفره هفت‌سین و هر یک از اجزای آن خواهید دید. شما می‌توانید برای عکس پروفایل خود، عکس سفره هفت سینی که چیده‌اید را در نظر بگیرید. در این صورت، می‌توانید تصویری خاص و منحصربه‌فرد برای عکس عید نوروز داشته باشید. این ایده می‌تواند برای عکس عید نوروز کودکانه نیز ایده مناسبی باشد.
                            </p>
                            <p className="font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                سفره هفت‌سین شامل اجزای مختلفی ازجمله سرکه، سبزه و سنجد هستند که همگی این موارد، نشان‌دهنده آرزوهای مختلف برای سال جدید هستند. شاید برایتان جالب باشد که هر یک از مواردی که در سفره هفت‌سین استفاده می‌شوند نماد چه چیزهایی هستند. هفت موردی که در این سفره استفاده می‌شوند به زندگی جدید و نو شدن اشاره دارند. معنای هر یک از آن‌ها عبارت است از:
                            </p>
                            <ul className='mr-7 w-11/12'>
                                <li className="list-disc font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                    سیب: باروری و زیبایی
                                </li>
                                <li className="list-disc font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                    سنبل: خوشبوکننده
                                </li>
                                <li className="list-disc font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                    سرکه: جاودانگی و ابدیت
                                </li>
                                <li className="list-disc font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                    سنجد: باروری و عشق
                                </li>
                                <li className="list-disc font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                    سبزه: تولد دوباره
                                </li>
                                <li className="list-disc font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                    سمنو: شیرینی
                                </li>
                                <li className="list-disc font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                    سکه: ثروت
                                </li>
                            </ul>
                            <p className="font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                اگرچه در این سال جدید به دلیل شیوع سویه اومیکرون ویروس کرونا با محدودیت‌هایی برای دور هم جمع شدن روبرو هستیم اما شما می‌توانید با کسانی که با آن‌ها زندگی می‌کنید در خانه جشن کوچکی بگیرید. در این صورت اگر به دنبال عکس عید نوروز 1401 هستید می‌توانید در جشن کوچکی که گرفته‌اید عکس‌های زیبایی را با لباس‌های جدید و سفره هفت‌سین بگیرید و این عکس‌ها را برای پروفایل خود در نظر بگیرید. همچنین، می‌توانید با فرزندتان عکس بگیرید و از تصویر آن به‌عنوان عکس عید نوروز کودکانه استفاده کنید.
                            </p>
                            <h2 className="my-4 font-yekanBakh text-xl font-bold">
                                عکس عاشقانه نوروز
                            </h2>
                            <p className="font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                اگر به‌تازگی ازدواج کرده‌اید یا در سال جدید قرار است تشکیل خانواده دهید، ممکن است به دنبال ایده عاشقانه‌ای برای عکس عید نوروز 1401 و اهنگ عید نوروز باشید. اگرچه می‌توانید با جستجو در اینترنت، تصاویر آماده‌شده‌ای برای عکس عید نوروز پیدا کنید اما می‌توانید در این مورد از ایده‌های مختلفی استفاده کنید تا تصویر منحصربه‌فردی برای عکس پروفایل عید نوروز داشته باشید.
                            </p>
                            <p className="font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                همانطور که در انتخاب اهنگ عید نوروز گزینه‌های مختلفی دارید، تصاویر نوروزی متعددی نیز در اینترنت در دسترس هستند. با‌این‌حال، شما می‌توانید یک عکس دونفره را با شعری عاشقانه ترکیب کنید و درنتیجه، تصویری متناسب با حال و هوای عاشقانه خود ایجاد کنید. همچنین، می‌توانید برای كارت پستال و عکس عید نوروز در ایران از متن‌های کوتاه خاصی که هم با عشق و هم با نو شدن ارتباط دارند استفاده کنید. در ادامه با چند نمونه از این متن‌ها آشنا می‌شوید.
                            </p>
                            <ul className='mr-7 w-11/12'>
                                <li className="list-disc font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                    سال نو یعنی تو.
                                </li>
                                <li className="list-disc font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                    بهار من تویی.
                                </li>
                                <li className="list-disc font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                    آرزوی من این است که امسال در زمان تحویل سال، خدا دستان تو را به من تحویل دهد.
                                </li>
                                <li className="list-disc font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                    من با آرزوی داشتن تو بر سر سفره نوروز می‌نشینم. عيدت مبارك.
                                </li>
                            </ul>
                            <p className="font-yekanBakh text-base text-romanSilver font-normal leading-8 ">
                                درنهایت، همانطور که می‌دانید نوروز بزرگترین جشن فارسی‌زبان‌ها ازجمله ایرانیان است. در این موقع از سال، ما در تلاش هستیم که نه‌تنها ظاهر خود را نو کنیم، بلکه اهداف جدیدی را در نظر می‌گیریم و سعی می‌کنیم در سال پیش رو برای دستیابی به آن‌ها تلاش کنیم. در این میان، ممکن است علاوه بر استفاده از اهنگ عید نوروز، بخواهیم با قرار دادن عکسی در شبکه‌های اجتماعی، به دیگران ازجمله رفیق و دوستان پیشاپیش عید را تبریک بگوییم. اگر می‌خواهید با یک عکس عید نوروز 1401، تبریک نوروزی شما برای دیگران چشمگیرتر باشد، مهم است که عکسی منحصربه‌فرد و خاص را در نظر بگیرید که خودتان آن را متناسب با سلیقه خود طراحی کرده‌اید.
                            </p>
                        </Collapse>
                    </div>
                    <button
                        onClick={() => {
                            setIsOpen(!isOpen)
                        }}
                        className='w-28 h-10 my-4 font-yekanBakh font-semibold text-base rounded-full bg-primary text-white flex items-center justify-center'>
                        {isOpen ? 'مشاهده کمتر' : 'مشاهده بیشتر'}
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default ContentBox;