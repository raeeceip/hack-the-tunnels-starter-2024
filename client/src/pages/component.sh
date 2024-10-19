## write a script to create anew component scaffolding
# It should be able todo the fillowing 
 # Create a new folder with the component name
    # Create a neew files, an index.ts , a ${componentName}.tsx and a ${componentname}.style.scss
    # Add the following boilerplate code to the files
    # ask for an input from the user for the component name 

#bin/bash
#!/bin/bash

# Ask for the component name
read -p "Enter the component name: " component_name

# Create a new folder with the component name
mkdir -p "$component_name"

# Create index.ts file
cat > "$component_name/index.ts" << EOL
export { default } from './${component_name}';
EOL

# Create ComponentName.tsx file
cat > "$component_name/${component_name}.tsx" << EOL
import React from 'react';
import './${component_name}.style.scss';

const ${component_name} = () => {
  return (
    <div className="${component_name}">
      {/* Your component goes here */}
    </div>
  );
};

export default ${component_name};
EOL

# Create ComponentName.style.scss file
cat > "$component_name/${component_name}.style.scss" << EOL
.${component_name} {
  // Your styles go here
}
EOL


echo "Component scaffold for ${component_name} has been created successfully!"