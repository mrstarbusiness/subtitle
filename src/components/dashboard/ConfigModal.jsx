// components/ConfigModal.js
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function ConfigModal({ showModal, onClose, onSave, config }) {
  const [type, setType] = useState(config?.type || "");
  const [value, setValue] = useState(config?.value || "");

  useEffect(() => {
    setType(config?.type || "");
    setValue(config?.value || "");
  }, [config]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: config?._id, type, value });
  };

  return (
    <Dialog open={showModal} handler={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          {config ? "Edit Configuration" : "Add Configuration"}
        </DialogHeader>
        <DialogBody>
          <div className="mb-4">
            <div className="mb-4">
              <label className="block mb-1">Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Value</label>

              <textarea
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full border rounded p-2"
                rows={5}
                required
              ></textarea>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={onClose} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="cyan" type="submit">
            <span> {config ? 'Update Configuration' :  'Create Configuration'}</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
