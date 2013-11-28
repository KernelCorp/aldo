class CreateGaleriesImagesJoinTable < ActiveRecord::Migration
  def change
    create_table :galleries_images, :id => false do |t|
      t.integer :gallery_id
      t.integer :image_id
    end

    add_index :galleries_images, [:gallery_id, :image_id]
  end
end