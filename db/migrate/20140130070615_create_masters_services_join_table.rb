class CreateMastersServicesJoinTable < ActiveRecord::Migration
  def change
    create_table :masters_services, id: false do |t|
      t.integer :master_id
      t.integer :service_id
    end

    add_index :masters_services, [:master_id, :service_id]
  end
end
