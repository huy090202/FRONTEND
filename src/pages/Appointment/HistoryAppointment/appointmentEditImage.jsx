/* eslint-disable react/prop-types */
import { Modal, Image } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateAppoinmentImage } from '~/services/appoinmentService';

const AppointmentEditImage = ({ isEditImageModalVisible, imageForEdit, onCancel, token }) => {
    const [selectedImageForEdit, setSelectedImageForEdit] = useState(imageForEdit);

    const handleUpdateImage = async () => {
        if (!selectedImageForEdit || !selectedImageForEdit.file) {
            toast.error('Vui lòng chọn một ảnh mới.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image_url', selectedImageForEdit.file);

            const response = await updateAppoinmentImage(
                token,
                { imageId: imageForEdit.id },
                formData
            );

            if (response.status === false) {
                toast.error(response.message);
            } else {
                toast.success(response.message);
                onCancel();
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi, vui lòng thử lại.');
        }
    };

    return (
        <Modal
            visible={isEditImageModalVisible}
            onCancel={onCancel}
            maskClosable={true}
            onOk={handleUpdateImage}
            style={{
                fontFamily: 'LXGW WenKai TC',
                cursive: 'LXGW Wen'
            }}
        >
            <div className='mb-10 text-4xl font-semibold'>Cập nhật ảnh tình trạng xe</div>
            <input
                type='file'
                accept='image/*'
                onChange={(e) => {
                    const file = e.target.files[0];
                    setSelectedImageForEdit({
                        ...selectedImageForEdit,
                        file,
                        preview: URL.createObjectURL(file)
                    });
                }}
            />
            {selectedImageForEdit && selectedImageForEdit.preview && (
                <Image src={selectedImageForEdit.preview} alt='Preview Image' />
            )}
        </Modal>
    );
};

export default AppointmentEditImage;
