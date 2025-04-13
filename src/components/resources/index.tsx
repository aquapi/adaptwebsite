import { createSignal } from "solid-js";

const documents = [
  {
    name: "Annual Report 2023.pdf",
    category: "Reports",
  },
  {
    name: "Quarterly Report Q4.pdf",
    category: "Reports",
  },
  {
    name: "Marketing Strategy.pdf",
    category: "Reports",
  },
  {
    name: "Contract Agreement.pdf",
    category: "Contracts",
  },
  {
    name: "Service Agreement.pdf",
    category: "Contracts",
  },
  {
    name: "Invoice #1234.pdf",
    category: "Invoices",
  },
  {
    name: "Invoice #1235.pdf",
    category: "Invoices",
  },
  {
    name: "User Manual v2.1.pdf",
    category: "Manuals",
  },
  {
    name: "Product Specifications.pdf",
    category: "Manuals",
  },
];

const categories = ["All", ...new Set(documents.map((doc) => doc.category))];

export default function DocumentList() {
  const [selectedCategory, setSelectedCategory] = createSignal("All");

  const filteredDocuments = () =>
    selectedCategory() === "All"
      ? documents
      : documents.filter((doc) => doc.category === selectedCategory());

  return (
    <div class="max-w-5xl mx-auto p-16">
      <h1 class="text-5xl font-bold mb-8 text-[#FAFAFA] text-center">
        Resources
      </h1>

      <div class="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            type="button"
            class={`px-4 py-2 rounded-xl text-sm font-medium select-none hover:cursor-pointer hover:bg-gray-500 hover:text-[#FAFAFA] transition ${
              selectedCategory() === category
                ? "bg-gray-600 text-white"
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
            <div class="text-2xl font-semibold select-none mt-auto mb-auto w-8 h-8 text-center">
              🗎
            </div>
            <div class="flex-1">
              <div class="font-semibold cursor-text text-gray-700">
                {doc.name}
              </div>
              <div class="text-sm text-gray-500 select-none">
                {doc.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
