class CreateNewsImagesJoinTable < ActiveRecord::Migration
  def up
    create_table :images_news, :id => false do |t|
      t.integer :image_id
      t.integer :news_id
    end

    add_index :images_news, [:image_id, :news_id]
  end

  def down
    drop_table :images_news
  end
end
