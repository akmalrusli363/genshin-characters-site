import { Modal } from "../ui/modal";

export default function Loading() {
    return <Modal>
        <div className="center text-center">
            <p className="text-center text-2xl font-bold p-8">Loading…</p>
        </div>
    </Modal>
}