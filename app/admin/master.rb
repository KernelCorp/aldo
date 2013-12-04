ActiveAdmin.register Master do
  config.filters = false
  
  form do |f|
    f.inputs do
      f.input :fio
      f.input :biography
      f.input :photo, as: :file
    end
    f.actions
  end

end
