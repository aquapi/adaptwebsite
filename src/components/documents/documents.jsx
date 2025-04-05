import { createSignal } from "solid-js";

const documents = [
  {
    name: "Annual Report 2023.pdf",
    category: "Reports",
    date: "Mar 12, 2023",
    size: "4.2 MB",
  },
  {
    name: "Quarterly Report Q4.pdf",
    category: "Reports",
    date: "Feb 20, 2023",
    size: "5.4 MB",
  },
  {
    name: "Marketing Strategy.pdf",
    category: "Reports",
    date: "Feb 5, 2023",
    size: "2.3 MB",
  },
  {
    name: "Contract Agreement.pdf",
    category: "Contracts",
    date: "Mar 1, 2023",
    size: "1.2 MB",
  },
  {
    name: "Service Agreement.pdf",
    category: "Contracts",
    date: "Feb 15, 2023",
    size: "1.5 MB",
  },
  {
    name: "Invoice #1234.pdf",
    category: "Invoices",
    date: "Feb 28, 2023",
    size: "0.8 MB",
  },
  {
    name: "Invoice #1235.pdf",
    category: "Invoices",
    date: "Feb 10, 2023",
    size: "0.7 MB",
  },
  {
    name: "User Manual v2.1.pdf",
    category: "Manuals",
    date: "Mar 5, 2023",
    size: "8.5 MB",
  },
  {
    name: "Product Specifications.pdf",
    category: "Manuals",
    date: "Feb 25, 2023",
    size: "3.1 MB",
  },
]; // kco category proposals nma cái ảnh có 1 file có =)))

const categories = ["All", "Reports", "Contracts", "Invoices", "Manuals"];

export default function DocumentList() {
  const [selectedCategory, setSelectedCategory] = createSignal("All");

  const filteredDocuments = () =>
    selectedCategory() === "All"
      ? documents
      : documents.filter((doc) => doc.category === selectedCategory());

  return (
    <div class="max-w-5xl mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Document Categories</h1>

      <div class="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            class={`px-4 py-2 rounded-full text-sm font-medium select-none hover:cursor-pointer hover:bg-gray-800 hover:text-white transition ${
              selectedCategory() === category
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredDocuments().map((doc) => (
          <div class="border p-4 rounded-lg shadow-sm flex items-start space-x-4 bg-white hover:cursor-pointer hover:shadow-md transition">
            <div class="text-2xl font-semibold select-none mt-auto mb-auto bg-gray-200 w-8 h-8 text-center">🗎</div>
            <div class="flex-1">
              <div class="font-semibold cursor-text">{doc.name}</div>
              <div class="text-sm text-gray-500 select-none">
                {doc.category} • {doc.date} • {doc.size}
              </div>
            </div>
            <button class="select-none font-semibold hover:text-black hover:cursor-pointer mt-auto mb-auto">🗎</button>
          </div>
        ))}
      </div>
    </div>
  );
}
