class CreateNews < ActiveRecord::Migration
  def change
    create_table :news do |t|
      t.string :title
      t.text :preview
      t.text :body
      
      t.string :slug

      t.timestamps
    end

    add_index :news, :slug, unique: true
  end
end
