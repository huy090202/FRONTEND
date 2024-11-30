import imageOriginalStyle1 from '~/assets/images/AboutUs/sectionOriginStyle1.png';
import imageOriginalStyle2 from '~/assets/images/AboutUs/sectionOriginStyle2.png';

const SectionOriginalStyle = () => {
    return (
        <div className='flex flex-col section-originalStyle-container'>
            <div className='mx-auto my-4 overflow-hidden md:max-w-full'>
                <div className='md:flex section-originalStyle-top'>
                    <div className='text-justify md:w-1/2'>
                        <div className='uppercase tracking-wide text-2xl text-[#6699BB] font-semibold'>
                            Đội ngũ kỹ thuật viên chuyên nghiệp
                        </div>

                        <p className='my-6 text-2xl font-[400] text-slate-500'>
                            Với đội ngũ kỹ thuật viên chuyên nghiệp, Huy Motorbike tự tin cung cấp
                            dịch vụ sửa chữa, bảo dưỡng xe máy chất lượng, nhanh chóng và uy tín.
                            Đội ngũ kỹ thuật viên của chúng tôi được đào tạo chuyên sâu, có kinh
                            nghiệm và nhiệt huyết trong công việc. Huy Motorbike cam kết sẽ mang đến
                            cho khách hàng những dịch vụ tốt nhất, giúp xe của bạn luôn hoạt động ổn
                            định và an toàn. Hãy đến với Huy Motorbike để trải nghiệm dịch vụ tốt
                            nhất từ đội ngũ kỹ thuật viên chuyên nghiệp của chúng tôi.
                        </p>
                    </div>

                    <div className='md:shrink-0 md:w-1/2 md:flex md:items-center md:justify-end'>
                        <img
                            className='object-cover w-full h-48 md:h-96 md:w-10/12 rounded-xl'
                            src={imageOriginalStyle1}
                            alt=''
                        />
                    </div>
                </div>
            </div>
            <div className='mx-auto my-4 overflow-hidden md:max-w-full'>
                <div className='md:flex section-originalStyle-bottom'>
                    <div className='md:shrink-0 md:w-1/2 md:flex md:items-center md:justify-start'>
                        <img
                            className='object-cover w-full h-48 md:h-96 md:w-10/12 rounded-xl'
                            src={imageOriginalStyle2}
                            alt=''
                        />
                    </div>

                    <div className='text-justify md:w-1/2'>
                        <div className='md:text-right uppercase tracking-wide text-2xl text-[#6699BB] font-semibold'>
                            Phụ tùng chính hãng, đa dạng, phong phú
                        </div>

                        <p className='my-6 text-2xl font-[400] text-slate-500'>
                            Huy Motorbike cung cấp phụ tùng chính hãng, đa dạng, phong phú, đảm bảo
                            chất lượng, giá cả cạnh tranh. Chúng tôi cung cấp phụ tùng chính hãng
                            cho các dòng xe máy phổ biến trên thị trường hiện nay. Với phương châm
                            {' "Uy tín là vàng"'}, Huy Motorbike cam kết sẽ mang đến cho khách hàng
                            các phụ tùng chính hãng chất lượng, giá cả cạnh tranh nhất. Hãy đến với
                            Huy Motorbike để trải nghiệm dịch vụ tốt nhất từ đội ngũ kỹ thuật viên
                            chuyên nghiệp của chúng tôi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionOriginalStyle;
