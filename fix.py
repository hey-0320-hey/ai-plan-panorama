import os

files = [
    r'E:\HA-Work\Token-plan通\ai-plan-panorama\src\components\PlanCard.vue',
    r'E:\HA-Work\Token-plan通\ai-plan-panorama\src\components\FilterBar.vue',
    r'E:\HA-Work\Token-plan通\ai-plan-panorama\src\components\CompareTray.vue',
    r'E:\HA-Work\Token-plan通\ai-plan-panorama\src\views\HomePage.vue',
    r'E:\HA-Work\Token-plan通\ai-plan-panorama\src\views\CalculatorPage.vue',
]

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace inject('isDark') with properly typed version
    content = content.replace(
        "inject('isDark')",
        "inject('isDark') as Ref<boolean>"
    )
    
    # Make sure Ref is imported
    if "as Ref<boolean>" in content and "type Ref" not in content:
        content = content.replace(
            "} from 'vue'",
            ", type Ref } from 'vue'"
        )
    
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Fixed {os.path.basename(fpath)}')
