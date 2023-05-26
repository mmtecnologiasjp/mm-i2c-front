import cs from 'classnames';
import { useEffect, useRef, useState } from 'react';
import Avatar from 'react-avatar-edit';

import { useCreateGroupMutation } from '../../hooks/useCreateGroupMutation';
import { HStack } from '../HStack';

export function CreateGroupModalContent({
  onCloseDueNavigation,
}: {
  onCloseDueNavigation: () => void;
}) {
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
  });
  const [base64Url, setBase64Url] = useState<URL | null>(null);
  const { mutate } = useCreateGroupMutation();
  const componentIsMunt = useRef(false);

  const onFieldChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onCloseCrop = () => {
    setBase64Url(null);
  };

  const onCrop = (view: string) => {
    const base64Url = view as unknown as URL;
    setBase64Url(base64Url);
  };

  const isEnabled = cs({
    'btn-disabled': !formValues.name || !formValues.description,
  });

  const cleanStates = () => {
    setBase64Url(null);
    setFormValues({
      name: '',
      description: '',
    });
    componentIsMunt.current = false;
  };

  useEffect(() => {
    componentIsMunt.current = true;
  }, [onCloseDueNavigation]);

  const handleCreateGroup = () => {
    if (!formValues.name || !formValues.description) return;
    if (!base64Url) return;

    const data = {
      name: formValues.name,
      description: formValues.description,
      image_url: base64Url.toString(),
      creator_uuid: import.meta.env.VITE_USER_MOCK_UUID,
    };

    mutate(data);
    cleanStates();
    onCloseDueNavigation();
  };

  return (
    <div>
      <h3 className="modal-header">Create group</h3>
      <div className="divider"></div>
      <HStack className="items-center space-x-4 justify-center">
        {componentIsMunt.current && (
          <Avatar
            height={150}
            width={150}
            onCrop={onCrop}
            onClose={onCloseCrop}
            imageWidth={280}
            label="Image"
            labelStyle={{
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
            }}
          />
        )}
      </HStack>
      <div className="mt-12 space-y-8">
        <input
          className="input input-bordered w-full placeholder:text-lg placeholder:text-gray-600"
          placeholder="Group name"
          name="name"
          value={formValues.name}
          onChange={onFieldChange}
          maxLength={50}
        />
        <textarea
          className="textarea textarea-bordered w-full placeholder:text-lg  placeholder:text-gray-600"
          placeholder="Description"
          maxLength={400}
          value={formValues.description}
          onChange={onFieldChange}
          name="description"
        />
      </div>
      <div className="flex justify-end">
        <button className={`btn mt-5 ${isEnabled}`} onClick={handleCreateGroup}>
          Create
        </button>
      </div>
    </div>
  );
}
