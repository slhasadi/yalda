import Container from "../Container";
import Rhombuses from "../Shapes/Rhombuses";
import Stack from "../Stack";
import Count from "./CountDown"

const CountDown = () => {
  return (
    <>
        <section className='bg-box-main py-0 md:py-4 bg-gradient-to-b from-[#700f2e] to-[#b3083e]'>
          <Container>
            <Stack className='flex-col lg:flex-row items-center justify-between'>
              <Rhombuses className='hidden md:flex self-end lg:self-center flex-row-reverse' />
              <Stack className="flex-col-reverse lg:flex-row gap-x-8 flex-col items-center lg:justify-center w-full py-2">
                <Count />
                <Stack className='w-full md:w-auto relative items-center justify-center pb-4'>
                  <Rhombuses className='md:hidden' />
                  <strong className="w-full md:w-auto py-2 text-center text-xs md:text-sm lg:text-lg font-semibold whitespace-nowrap text-white">
                    زمان مانده به شروع جام جهانی 2022 قطر
                  </strong>
                  <Rhombuses className='md:hidden flex-row-reverse' />
                </Stack>
              </Stack>
              <Rhombuses className='hidden md:flex self-start lg:self-center' />
            </Stack>
          </Container>
        </section>
    </>
  );
};
export default CountDown;
