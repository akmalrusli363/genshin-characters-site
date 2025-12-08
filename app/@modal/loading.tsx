import { Modal } from "../ui/modal";

export default function Loading() {
    return <Modal>
        <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
            <p className="text-center text-2xl font-bold text-white">Loading…</p>
            <p className="text-center text-lg text-gray-300 mt-2">Please wait while we fetch the data.</p>
        </div>
    </Modal>
}