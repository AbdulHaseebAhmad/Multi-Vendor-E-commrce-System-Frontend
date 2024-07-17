import React, {useState} from 'react'

export default function ProductsFilter() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all"); // Default category option
    const [selectedPrice, setSelectedPrice] = useState("all"); // Default price option
    const [selectedColor, setSelectedColor] = useState("all"); // Default color option
    const [selectedSize, setSelectedSize] = useState("all"); // Default size option
  return (
    <div>
      <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 block mx-auto"
          style={{ maxWidth: "400px" }}
        />

        {/* Filter Options */}
        <div className="flex justify-center space-x-4 mb-4">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="all">All Categories</option>
            <option value="Category A">Category A</option>
            <option value="Category B">Category B</option>
            <option value="Category C">Category C</option>
            {/* Add more category options as needed */}
          </select>

          {/* Price Filter */}
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="all">All Prices</option>
            <option value="$10">$10</option>
            <option value="$20">$20</option>
            <option value="$25">$25</option>
            {/* Add more price options as needed */}
          </select>

          {/* Color Filter */}
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="all">All Colors</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            {/* Add more color options as needed */}
          </select>

          {/* Size Filter */}
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="all">All Sizes</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            {/* Add more size options as needed */}
          </select>
        </div>

    </div>
  )
}
