class CreateSlides < ActiveRecord::Migration
  def change
    create_table :slides do |t|
      t.string :title
      t.text :content
      t.string :href

      t.timestamps
    end
  end
end
