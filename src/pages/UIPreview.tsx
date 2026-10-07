import { useState } from "react";
import {
  Avatar, Badge, Button, ConfirmDialog, EmptyState, Input,
  Modal, Skeleton, Spinner, Textarea,
} from "@/shared/components/ui";
import { Heart, Search } from "lucide-react";

export default function UIPreview() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-extrabold text-slate-900">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button isLoading>Loading</Button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-extrabold text-slate-900">Inputs</h2>
        <div className="space-y-4">
          <Input label="Email" placeholder="Enter email" />
          <Input
            label="With icon"
            placeholder="Search"
            icon={<Search className="h-4 w-4" />}
          />
          <Input
            label="With error"
            placeholder="This field is required"
            error="Please enter a value"
          />
          <Input
            label="With hint"
            placeholder="Enter hint text"
            hint="This is a helper text"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-extrabold text-slate-900">Textarea</h2>
        <div className="space-y-4">
          <Textarea label="Bio" placeholder="Tell us about yourself" />
          <Textarea
            label="Error state"
            placeholder="What went wrong?"
            error="Please explain the issue"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-extrabold text-slate-900">Avatar</h2>
        <div className="flex gap-6">
          <Avatar src="/route.png" alt="User" size={40} />
          <Avatar
            src="https://invalid.url/image.jpg"
            alt="Fallback"
            size={40}
          />
          <Avatar src="/route.png" alt="Large" size={80} />
          <Avatar src="/route.png" alt="Small" size={20} />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-extrabold text-slate-900">Spinner</h2>
        <div className="flex gap-6 items-center">
          <Spinner size={16} />
          <Spinner size={24} />
          <Spinner size={32} className="text-[#1877f2]" />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-extrabold text-slate-900">Badge</h2>
        <div className="flex gap-4 items-center">
          <Badge count={5} />
          <Badge count={99} />
          <Badge count={150} />
          <Badge count={0} /> {/* should render null */}
          <div className="text-sm text-slate-500">(Badge with count 0 is invisible)</div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-extrabold text-slate-900">Skeleton</h2>
        <div className="flex gap-4">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-40 h-4" />
          <Skeleton className="w-48 h-4" />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-extrabold text-slate-900">EmptyState</h2>
        <div className="text-center">
          <EmptyState
            icon={<Heart className="h-6 w-6" />}
            title="No posts yet"
            description="You haven't posted anything. Start sharing now!"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-extrabold text-slate-900">Modal</h2>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Open Modal
        </Button>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Example Modal"
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setModalOpen(false)}>
                Save
              </Button>
            </div>
          }
        >
          <p className="text-sm text-slate-600">
            This is a modal example. You can place any content here.
          </p>
        </Modal>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-extrabold text-slate-900">ConfirmDialog</h2>
        <Button
          variant="danger"
          onClick={() => {
            setConfirmOpen(true);
            setConfirming(false);
          }}
        >
          Open Confirm Dialog
        </Button>
        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirming(true);
            // Simulate async action
            setTimeout(() => {
              setConfirmOpen(false);
              setConfirming(false);
            }, 1500);
          }}
          title="Delete this post?"
          description="This action cannot be undone. Are you sure?"
          isConfirming={confirming}
          confirmLabel="Delete"
          confirmPendingLabel="Deleting..."
        />
      </section>
    </div>
  );
}