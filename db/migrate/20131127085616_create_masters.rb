class CreateMasters < ActiveRecord::Migration
  def change
    create_table :masters do |t|
      t.string :fio
      t.text :biography

      t.timestamps
    end
  end
end
