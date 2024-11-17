/* eslint-disable react/prop-types */
import { Modal } from 'antd';
import SectionMotor from './SectionMotor/sectionMotor';
import SectionAppoint from './SectionAppoint/sectionAppoint';

const MaintenanceModalDetail = ({ visible, onCancel, maintenance, appoint, motor, user }) => {
    return (
        <Modal
            visible={visible}
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
                <div className='flex flex-col gap-10'>
                    <h2 className='text-4xl font-bold text-center'>Chi tiết đơn bảo dưỡng</h2>
                    <p className='text-xl'>
                        Tên khách hàng: {user.firstName} {user.lastName}
                    </p>
                    <p className='text-xl'>Số điện thoại: {user.phoneNumber}</p>
                    <p className='text-xl'>Email: {user.email}</p>
                    <SectionAppoint appoint={appoint} />
                    <SectionMotor motor={motor} />
                </div>
            )}
        </Modal>
    );
};

export default MaintenanceModalDetail;
