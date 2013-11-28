ActiveAdmin.register Gallery do
  form do |f|
    f.inputs do
      f.has_many :images, :allow_destroy => true do |cf|
        cf.input :path
      end
    end
    f.actions
  end
end
