/* eslint-disable react/prop-types */
import { Modal } from 'antd';
import SectionMotor from './SectionMotor/sectionMotor';
import SectionAppoint from './SectionAppoint/sectionAppoint';
import SectionUser from './SectionUser/sectionUser';
import SectionMain from './SectionMain/sectionMain';

const MaintenanceModalDetail = ({ visible, onCancel, maintenance, appoint, motor, user }) => {
    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            style={{
                fontFamily: 'LXGW WenKai TC',
                cursive: 'LXGW Wen'
            }}
            width={900}
        >
            {maintenance && appoint && motor && user && (
                <div className='flex flex-col gap-5'>
                    <h1 className='text-4xl font-bold text-center uppercase'>
                        Chi tiết đơn bảo dưỡng
                    </h1>
                    <h2 className='text-3xl font-bold'>Thông tin khách hàng</h2>
                    <SectionUser user={user} />
                    <h2 className='text-3xl font-bold'>Thông tin lịch hẹn</h2>
                    <SectionAppoint appoint={appoint} />
                    <h2 className='text-3xl font-bold'>Thông tin xe</h2>
                    <SectionMotor motor={motor} />
                    <h2 className='text-3xl font-bold'>Thông tin bảo dưỡng</h2>
                    <SectionMain
                        maintenance={maintenance}
                        appoint={appoint}
                        motor={motor}
                        user={user}
                        onCancel={onCancel}
                    />
                </div>
            )}
        </Modal>
    );
};

export default MaintenanceModalDetail;
