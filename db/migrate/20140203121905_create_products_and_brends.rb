class CreateProductsAndBrends < ActiveRecord::Migration
  def change
    create_table :brends do |t|
      t.string :name
      t.string :header
      t.text :text
      t.attachment :background
      t.string :slug
    end
    add_index :brends, :slug, unique: true

    create_table :products do |t|
      t.references :brend
      t.string :name
      t.text :text
      t.attachment :background
      t.string :slug
    end
    add_index :products, :brend_id
    add_index :products, :slug, unique: true
  end
end
