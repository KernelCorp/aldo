class CreateTableImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.attachment :path
      t.timestamps
    end
  end
end
