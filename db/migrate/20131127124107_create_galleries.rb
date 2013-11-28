class CreateGalleries < ActiveRecord::Migration
  def change
    create_table :galleries

    2.times do
      Gallery.create
    end
  end
end
