class AddAttachmentImageToPresses < ActiveRecord::Migration
  def self.up
    change_table :presses do |t|
      t.attachment :image
    end
  end

  def self.down
    drop_attached_file :presses, :image
  end
end
