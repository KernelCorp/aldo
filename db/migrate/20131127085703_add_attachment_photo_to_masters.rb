class AddAttachmentPhotoToMasters < ActiveRecord::Migration
  def self.up
    change_table :masters do |t|
      t.attachment :photo
    end
  end

  def self.down
    drop_attached_file :masters, :photo
  end
end
