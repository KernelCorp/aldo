class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.references :service
      t.references :master
      t.string :fio
      t.string :phone
      t.string :email

      t.timestamps
    end
    
    add_index :appointments, :service_id
    add_index :appointments, :master_id
  end
end
